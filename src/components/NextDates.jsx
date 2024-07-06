import { createElement } from '@wordpress/element';

const NextDates = ({ sessions }) => {
    if (!sessions || sessions.length === 0) {
        return <div className="no-sessions">Pas de sessions pour le moment</div>;
    }

    return (
        <ul className="session-list">
            {sessions.map((session, index) => (
                <li key={index}>
                    Du {new Date(session.startDate).toLocaleDateString()} au {new Date(session.endDate).toLocaleDateString()}
                </li>
            ))}
        </ul>
    );
};

export default NextDates;
