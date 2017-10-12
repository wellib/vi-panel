<?php

namespace Drupal\vi_panel\Controller;


use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Cookie;

/**
 * Defines a controller to render a single invoice.
 */
class ViController extends ControllerBase implements ContainerInjectionInterface {

  /**
   * {@inheritdoc}
   */
  public function on() {

    $output = array();
    $response = new Response();

    // $cookie = new Cookie('vi_enabled', TRUE, 0, '/' , NULL, FALSE);
    // $response->headers->setCookie($cookie);
    // $response->send();

    return [
      '#markup' => 'bad',
      '#attached' => [
        'library' => [
          'vi_panel/vi_panel',
        ]
      ]
    ];
  }

}
