import {OpmProceduralLink} from './OpmProceduralLink';
import {linkType} from "../../ConfigurationOptions";

export  class OvertimeUndertimeExceptionLink extends OpmProceduralLink {
  constructor(sourceElement, targetElement, condition, event ,id?:string) {
    super(sourceElement, targetElement, condition, event ,id);
   // this.attr({'.marker-source' : {d: ''}});
   // this.attr({'.marker-target' : {d: 'M30,46 L46,26 M40,46 L56,26 M60,46 L76,26 M26,36 L80,36'}});

    this.attr('.connection/targetMarker', {
      type: 'polyline', // SVG polyline
      fill: 'none',
      stroke: 'black',
      'stroke-width': 2,
      points:'4,10 13,-10 8.5,0 17,0 13,10 22,-10 17.5,0 32,0 28,10 37,-10'
    });

  }
  getParams() {
    const params = { linkType: linkType.UnderOvertimeException };
    return {...super.getProceduralLinkParams(), ...params};
  }
}
