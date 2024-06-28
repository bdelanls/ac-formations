import React from 'react';

const Satisfaction = ({ averageScore, evaluationCount }) => {
    return (
        <div class="formation-satisfaction">
            <p>{averageScore}/10 ({evaluationCount} avis)</p>
        </div>
    );
};

export default Satisfaction;
