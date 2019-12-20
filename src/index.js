import { registerBlockType } from '@wordpress/blocks';
import { TextControl, RangeControl, RadioControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

function GoogleMap( props ) {
	const style = { border: 0, height: props.height, width: '100%', };
	const baseUrl = 'https://maps.google.com/maps';

	const params = new URLSearchParams( {
		q: props.location,
		z: props.zoom || 1,
		t: props.type,
		output: 'embed',
	} );

	const src = baseUrl + '?' + params.toString();
	return <div>
		<iframe src={ src } style={ style }></iframe>
	</div>;
}

registerBlockType( 'boldgrid-block/map', {
	title: __( 'Map', 'boldgrid-map-block' ),
	icon: 'location',
	category: 'common',
	attributes: {
		location: {
			type: "string",
			default: "New York, NY",
		},
		height: {
			type: "number",
			default: 300,
		},
		type: {
			type: "string",
			default: 'm',
		},
		zoom: {
			type: "number",
			default: 12,
		},
	},
	keywords: [
		__( 'google', 'boldgrid-map-block' ),
		__( 'location', 'boldgrid-map-block' ),
		'BoldGrid',
	],
	example: {
		attributes: {
			location: 'New York, NY',
			zoom: 12,
			type: 'm',
			height: 300,
		},
	},
	edit ( props ) {
		return (
			<>
				<GoogleMap
					zoom={props.attributes.zoom}
					height={props.attributes.height}
					type={props.attributes.type}
					location={props.attributes.location} />
				<InspectorControls>
					<TextControl
						label="Address"
						placeholder= { __( 'Type the address', 'boldgrid-map-block' ) }
						value={ props.attributes.location }
						onChange={ ( location ) => props.setAttributes( { location } ) }
					/>
					<RangeControl
						label="Zoom"
						beforeIcon="search"
						value={ props.attributes.zoom }
						onChange={ ( zoom ) => props.setAttributes( { zoom } ) }
						min={ 1 }
						max={ 22 }
					/>
					<RangeControl
						label="Height"
						beforeIcon="align-center"
						value={ props.attributes.height }
						onChange={ ( height ) => props.setAttributes( { height } ) }
						min={ 0 }
						max={ 1000 }
					/>
					<RadioControl
						label={ __( 'Map Type:', 'boldgrid-map-block' ) }
						selected={ props.attributes.type }
						options={ [
							{ label: 'Roadmap', value: 'm' },
							{ label: 'Satellite', value: 'k' },
						] }
						onChange={ ( type ) => { props.setAttributes( { type } ) } }
					/>
				</InspectorControls>
			</>
		);
	},
	save( props ) {
		return <GoogleMap
			zoom={props.attributes.zoom}
			height={props.attributes.height}
			type={props.attributes.type}
			location={props.attributes.location} />
	},
} );