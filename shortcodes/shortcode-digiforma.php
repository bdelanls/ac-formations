<?php
function ac_formation_infos_shortcode() {
    return '<div class="digiforma-app" data-shortcode="formation_infos"></div>';
}
add_shortcode('formation_infos', 'ac_formation_infos_shortcode');

function ac_formation_nextdates_shortcode() {
    return '<div class="digiforma-app" data-shortcode="formation_nextdates"></div>';
}
add_shortcode('formation_nextdates', 'ac_formation_nextdates_shortcode');

function ac_formation_satisfaction_shortcode() {
    return '<div class="digiforma-app" data-shortcode="formation_satisfaction"></div>';
}
add_shortcode('formation_satisfaction', 'ac_formation_satisfaction_shortcode');

function ac_formation_document_shortcode() {
    return '<div class="digiforma-app" data-shortcode="formation_document"></div>';
}
add_shortcode('formation_document', 'ac_formation_document_shortcode');
