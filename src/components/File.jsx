import { createElement } from '@wordpress/element';

const File = ({ documents }) => {

    if (documents.length === 0) {
        return <p>Aucun document disponible.</p>;
    }

    return (
        <div class="formation-document">
            {documents.map((doc, index) => (
                doc.downloadable && (
                    <p key={index}>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">Téléchargez le programme</a>
                    </p>
                )
            ))}
        </div>
    );
};

export default File;
