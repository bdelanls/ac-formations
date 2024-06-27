import { createElement } from '@wordpress/element';

const File = ({ documents }) => {
    return (
        <div>
            <h3>Documents</h3>
            {documents.map((doc, index) => (
                doc.downloadable && (
                    <p key={index}>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">Télécharger le document</a>
                    </p>
                )
            ))}
        </div>
    );
};

export default File;
