import domReady from '@wordpress/dom-ready';
import { createElement, createRoot } from '@wordpress/element';
import { GraphQLClient } from 'graphql-request';
import Infos from './components/Infos';
import NextDates from './components/NextDates'
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
                        evaluationScore {
                            totalScores {
                                evaluationType
                                score
                            }
                        }
                    }
                }
            }
        }
    `;

    const variables = { programId };
    const data = await client.request(query, variables);
    return data.program;
}

function calculateSatisfactionAndCount(variants) {
  let totalScore = 0;
  let evaluationCount = 0;

  variants.forEach(variant => {
      const session = variant.trainingSession;
      const scores = session.evaluationScore?.[0]?.totalScores;

      if (scores) {
          scores.forEach(score => {
              if (score.evaluationType === 'TOTAL') {
                  totalScore += score.score;
                  evaluationCount++;
              }
          });
      }
  });

  const averageScore = evaluationCount > 0 ? (totalScore / evaluationCount).toFixed(1) : 'N/A';

  return { averageScore, evaluationCount };
}

const renderComponent = (Component, container, data) => {
  const root = createRoot(container);
  root.render(createElement(Component, data));
};

domReady(async () => {
  const containers = document.querySelectorAll('.digiforma-app');
  const renderedContainers = new Set();

  containers.forEach(async (container) => {
      const parentElement = container.closest('[id^="formation-"]');
      if (parentElement) {
          const programId = parentElement.id.split('-')[1];
          const shortcodeType = container.getAttribute('data-shortcode');

          if (!renderedContainers.has(container)) {
              const program = await fetchData(programId);

              // Filtrer les sessions pour ne garder que celles futures
              const today = new Date();
              const futureSessions = program.variants.map(variant => variant.trainingSession)
                  .filter(session => new Date(session.startDate) >= today);

              const { averageScore, evaluationCount } = calculateSatisfactionAndCount(program.variants);

              switch (shortcodeType) {
                  case 'formation_infos':
                      renderComponent(Infos, container, { program });
                      break;
                  case 'formation_nextdates':
                      renderComponent(NextDates, container, { sessions: futureSessions });
                      break;
                  case 'formation_satisfaction':
                      renderComponent(Satisfaction, container, { averageScore, evaluationCount });
                      break;
                  case 'formation_document':
                      renderComponent(File, container, { documents: program.documents });
                      break;
              }

              renderedContainers.add(container);
          }
      }
  });
});