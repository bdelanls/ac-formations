import { createElement } from '@wordpress/element';

const NextDates = ({ sessions }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const upcomingSessions = sessions.filter(session => new Date(session.startDate) >= new Date());

    return (
        <div>
            <h3>Prochaines dates de formation</h3>
            {upcomingSessions.map((session, index) => (
                <div key={index}>
                    <p>Date de début: {formatDate(session.startDate)}</p>
                    <p>Date de fin: {formatDate(session.endDate)}</p>
                </div>
            ))}
        </div>
    );
};

export default NextDates;
