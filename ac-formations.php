<?php
/*
Plugin Name: Altius Conseil Formations
Description: Extension conçue pour intégrer l'API de Digiforma. Cette extension permet de remonter automatiquement certaines informations des formations depuis Digiforma et de les afficher de manière dynamique sur le site.
Version: 1.0
Author: Bertrand Delanlssays
*/

// Sécurité : empêche l'accès direct aux fichiers
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Inclure tous les fichiers de shortcode
foreach (glob(plugin_dir_path(__FILE__) . 'shortcodes/*.php') as $file) {
    include_once $file;
}

// Ajouter une page de réglages pour entrer la clé API
add_action('admin_menu', 'ac_formations_add_admin_menu');
add_action('admin_init', 'ac_formations_settings_init');

function ac_formations_add_admin_menu() {
    add_options_page(
        'AC Formations',
        'AC Formations',
        'manage_options',
        'ac_formations',
        'ac_formations_options_page'
    );
}

function ac_formations_settings_init() {
    register_setting('ac_formations', 'token_digiforma');

    add_settings_section(
        'ac_formations_section',
        __('Paramètre de connection à l\'API de Digiforma', 'ac-formations'),
        null,
        'ac_formations'
    );

    add_settings_field(
        'token_digiforma',
        __('Token', 'ac-formations'),
        'token_digiforma_render',
        'ac_formations',
        'ac_formations_section'
    );
}

function token_digiforma_render() {
    $token = get_option('token_digiforma');
    echo '<input type="text" name="token_digiforma" value="' . esc_attr($token) . '" />';
}

function ac_formations_options_page() {
    ?>
    <form action='options.php' method='post' class='ac-formations-settings'>
        <h2>Altius Conseil - Extension</h2>
        <?php
        settings_fields('ac_formations');
        do_settings_sections('ac_formations');
        submit_button();
        ?>
    </form>
    <?php
}

// endpoint REST pour récupérer la clé API
add_action('rest_api_init', function () {
    register_rest_route('ac-formations/v1', '/token', array(
        'methods' => 'GET',
        'callback' => 'ac_formations_get_token',
        'permission_callback' => '__return_true',
    ));
});

function ac_formations_get_token() {
    return [
        'token' => get_option('token_digiforma')
    ];
}

// Enqueue le fichier CSS pour les réglages de l'administration
add_action('admin_enqueue_scripts', 'ac_formations_admin_styles');
function ac_formations_admin_styles($hook) {
    if ($hook != 'settings_page_ac_formations') {
        return;
    }
    wp_enqueue_style('ac-formations-admin-style', plugins_url('admin-style.css', __FILE__));
}


// Enqueue React and custom scripts
function digiforma_enqueue_scripts() {
    $asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

    if ( ! file_exists( $asset_file ) ) {
        return;
    }

    $asset = include $asset_file;

    wp_enqueue_script(
        'digiforma-react-app',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset['dependencies'],
        $asset['version'],
        true
    );

    wp_enqueue_style(
        'digiforma-react-app-style',
        plugins_url( 'build/index.css', __FILE__ ),
        array(),
        $asset['version']
    );
}
add_action( 'wp_enqueue_scripts', 'digiforma_enqueue_scripts' );

// Create a shortcode to display the React app
function digiforma_display_app() {
    return '<div id="digiforma-app">Loading...</div>';
}
add_shortcode( 'digiforma_app', 'digiforma_display_app' );
