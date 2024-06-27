import { createElement } from '@wordpress/element';


function Infos({ program }) {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div>
            <p>Formation créée le {formatDate(program.createdAt)}.</p>
            <p>Dernière mise à jour le {formatDate(program.updatedAt)}.</p>
            <p>Version du programme : {program.version}</p>
        </div>
    );
}

export default Infos;


