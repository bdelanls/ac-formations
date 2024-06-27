<?php

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


