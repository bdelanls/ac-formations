import { createElement, useEffect, useRef, useState } from '@wordpress/element';
import './satisfaction.scss';

const Satisfaction = ({ averageScore, evaluationCount }) => {
    const [isVisible, setIsVisible] = useState(false);
    const progressRef = useRef(null);
    const scorePercentage = (averageScore / 10) * 100;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (progressRef.current) {
            observer.observe(progressRef.current);
        }

        return () => {
            if (progressRef.current) {
                observer.unobserve(progressRef.current);
            }
        };
    }, []);

    return (
        <div className="satisfaction-container">
            <div className="progress-bar" ref={progressRef}>
                <div className={`progress-fill ${isVisible ? 'visible' : ''}`} style={{ width: isVisible ? `${scorePercentage}%` : 0 }}></div>
            </div>
            <div className="score-text">
                {averageScore}/10 <span className="evaluation-count">({evaluationCount} avis)</span>
            </div>
        </div>
    );
};

export default Satisfaction;
