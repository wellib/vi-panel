<?php
/**
 * @file
 * Block file for vi_panel module.
 */

/**
 * Provides a 'vi_panel' Block
 *
 * @Block(
 *   id = "vi_panel",
 *   admin_label = @Translation("vi_panel"),
 * )
 */

namespace Drupal\vi_panel\Plugin\Block;

use Drupal\Core\Block\BlockBase;

class ViPanel extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#theme' => 'vi_panel_block',
      '#attached' => array(
        'library' => array(
          'vi_panel/vi_panel',
        ),
      ),
    );
  }
}
