import React from 'react';

const Satisfaction = ({ averageScore, evaluationCount }) => {
    return (
        <div>
            <p>Taux de satisfaction des apprenants: {averageScore}/10</p>
            <p>Nombre d'avis: {evaluationCount} avis</p>
        </div>
    );
};

export default Satisfaction;
