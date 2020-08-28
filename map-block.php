<?php
/**
 * Plugin Name: Map Block
 * Plugin URI: https://www.boldgrid.com/
 * Description: Google Maps block
 * Version: 1.0.1
 * Author: BoldGrid <support@boldgrid.com>
 * Author URI: https://www.boldgrid.com/
 * Text Domain: boldgrid-map-block
 * Domain Path: /languages
 * License: GPLv2 or later
 */

function boldgrid_block_map() {
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	wp_register_script(
		'boldgrid-block-map',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	register_block_type( 'boldgrid-block/map', array(
		'editor_script' => 'boldgrid-block-map',
	) );
}

add_action( 'enqueue_block_editor_assets', 'boldgrid_block_map' );