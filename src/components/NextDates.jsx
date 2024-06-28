import { createElement } from '@wordpress/element';

const NextDates = ({ sessions }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const upcomingSessions = sessions.filter(session => new Date(session.startDate) >= new Date());

    return (
        <div class="formation-nextdates">
            {upcomingSessions.map((session, index) => (
                    <p>Du {formatDate(session.startDate)} au {formatDate(session.endDate)}</p>
            ))}
        </div>
    );
};

export default NextDates;
