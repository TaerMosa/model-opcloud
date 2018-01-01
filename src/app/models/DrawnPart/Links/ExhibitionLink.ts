import {OpmFundamentalLink} from './OpmFundamentalLink';
import {linkType} from "../../ConfigurationOptions";

export  class ExhibitionLink extends OpmFundamentalLink {
  constructor(sourceElement, targetElement, graph ,id?:string) {
    super(sourceElement, targetElement, graph ,id);
  //  const image = '../../../../assets/icons/OPM_Links/StructuralExhibit.png';

    const SVGExhibit =['<svg xmlns="http://www.w3.org/2000/svg"' +
    ' xmlns:se="http://svg-edit.googlecode.com"' +
    ' xmlns:xlink="http://www.w3.org/1999/xlink" ' +
    'xmlns:dc="http://purl.org/dc/elements/1.1/" ' +
    'xmlns:cc="http://creativecommons.org/ns#"' +
    ' xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" ' +
    'xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" ' +
    'width="30" height="30" style="">' +
    '<g class="currentLayer" style="">' +
    '<title>Layer 1</title>' +
    '<path fill="#000000" fill-opacity="1" stroke="#000000" stroke-opacity="1" stroke-width="2" stroke-dasharray="none" stroke-linejoin="round" stroke-linecap="butt" stroke-dashoffset="" fill-rule="nonzero" opacity="1" marker-start="" marker-mid="" marker-end="" id="svg_1" d="M2.5000095926228028,2.500009592622746 " style="color: rgb(0, 0, 0);"/>' +
    '<path fill="white" stroke="#000000" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" marker-start="" marker-mid="" marker-end="" id="svg_3" d="M2.492512550697853,24.97922767453879 L15.327331224413275,0.7604779167355875 L28.162149898128664,24.97922767453879 L2.492512550697853,24.97922767453879 z" style="color: rgb(0, 0, 0);" class=""/>' +
    '<path fill="black" stroke="#000000" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" marker-start="" marker-mid="" marker-end="" id="svg_7" d="M10.262040632199465,19.732118465227213 L14.94954026218473,11.528994112752926 L19.637039892170023,19.732118465227213 L10.262040632199465,19.732118465227213 z" style="color: rgb(0, 0, 0);" class="" fill-opacity="1"/></g></svg>'].join('');

    this.triangle.attr({image: {'xlink:href': 'data:image/svg+xml;utf8,' + encodeURIComponent(SVGExhibit)}});
  }
  getParams() {
    const params = { linkType: linkType.Exhibition };
    return {...super.getFundamentalLinkParams(), ...params};
  }
  clone() {
    console.log("here");
    return new ExhibitionLink(this.sourceElement, this.targetElement, this.graph);
  }
}
