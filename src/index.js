import domReady from '@wordpress/dom-ready';
import { createElement, createRoot } from '@wordpress/element';
import { GraphQLClient } from 'graphql-request';
import Infos from './components/Infos';
import NextDates from './components/NextDates';
import Satisfaction from './components/Satisfaction';
import File from './components/File';

async function fetchToken() {
    const response = await fetch('/wp-json/ac-formations/v1/token');
    const data = await response.json();
    return data.token;
}

async function fetchData(programId) {
    const token = await fetchToken();
    const client = new GraphQLClient('https://app.digiforma.com/api/v1/graphiql', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const query = `
        query GetProgramDetails($programId: ID!) {
            program(id: $programId) {
                version
                createdAt
                updatedAt
                documents {
                    downloadable
                    url
                }
                variants {
                    trainingSession {
                        startDate
                        endDate
                        pipelineState
                    }
                }
            }
        }
    `;

    const variables = { programId };
    try {
        const data = await client.request(query, variables);
        return data.program;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function filterAndCalculate(variants) {
    const today = new Date();

    const futureSessions = variants
        .filter(variant => {
            const session = variant.trainingSession;
            const isOngoing = session.pipelineState === 'ongoing';
            const isFutureDate = new Date(session.startDate) >= today;
            return isOngoing && isFutureDate;
        })
        .map(variant => variant.trainingSession);

    return futureSessions;
}

const renderComponent = (Component, container, data) => {
    const root = createRoot(container);
    root.render(createElement(Component, data));
};

async function initializeDigiformaApp() {
    const containers = document.querySelectorAll('.digiforma-app');

    // Initialize idDigiforma once
    const idDigiformaElement = document.getElementById('id-digiforma');
    if (!idDigiformaElement) {
        console.error('ID Digiforma element not found.');
        return;
    }

    const idDigiforma = idDigiformaElement.innerText.trim();
    if (!idDigiforma) {
        console.error('ID Digiforma not found.');
        return;
    }

    for (const container of containers) {
        const shortcodeType = container.getAttribute('data-shortcode');
        const averageScore = parseFloat(container.getAttribute('data-average-score'));
        const evaluationCount = parseInt(container.getAttribute('data-evaluation-count'), 10);

        if (shortcodeType === 'formation_satisfaction' && isNaN(averageScore)) {
            container.closest('.satisfaction-content').style.display = 'none';
            continue;
        }

        try {
            const program = await fetchData(idDigiforma);
            const futureSessions = filterAndCalculate(program.variants);

            switch (shortcodeType) {
                case 'formation_infos':
                    renderComponent(Infos, container, { program });
                    break;
                case 'formation_nextdates':
                    renderComponent(NextDates, container, { sessions: futureSessions });
                    break;
                case 'formation_document':
                    renderComponent(File, container, { documents: program.documents });
                    break;
                case 'formation_satisfaction':
                    renderComponent(Satisfaction, container, { averageScore, evaluationCount });
                    break;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

domReady(() => {
    initializeDigiformaApp();
});
