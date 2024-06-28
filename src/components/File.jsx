import { createElement } from '@wordpress/element';

const File = ({ documents }) => {
    return (
        <div class="formation-document">
            {documents.map((doc, index) => (
                doc.downloadable && (
                    <p key={index}>
                        <a href={doc.url} target="_blank">Téléchargez le programme</a>
                    </p>
                )
            ))}
        </div>
    );
};

export default File;
