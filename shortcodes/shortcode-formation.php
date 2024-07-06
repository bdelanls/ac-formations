<?php

function render_satisfaction_shortcode($atts) {
    $atts = shortcode_atts(array(
        'taux' => 0,
        'avis' => 0,
    ), $atts, 'formation_satisfaction');

    $taux = !empty($atts['taux']) ? get_post_meta(get_the_ID(), $atts['taux'], true) : null;
    $avis = !empty($atts['avis']) ? get_post_meta(get_the_ID(), $atts['avis'], true) : null;


    ob_start();
    ?>
    <div class="digiforma-app" data-shortcode="formation_satisfaction" data-average-score="<?php echo esc_attr($taux); ?>" data-evaluation-count="<?php echo esc_attr($avis); ?>">
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('formation_satisfaction', 'render_satisfaction_shortcode');