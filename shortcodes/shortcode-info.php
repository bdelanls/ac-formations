<?php
function ac_formation_infos($atts) {
    $atts = shortcode_atts(array(
        'id' => ''
    ), $atts, 'ac_formation');

    if (!$atts['id']) {
        return 'ID de la formation manquant.';
    }

    return '<div id="formation-infos" data-id="' . esc_attr($atts['id']) . '">Loading...</div>';
}

add_shortcode('formation_infos', 'ac_formation_infos');
