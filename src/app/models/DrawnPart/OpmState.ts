import {OpmEntity} from './OpmEntity';
import {arrangeEmbedded} from '../../configuration/elementsFunctionality/arrangeStates';
import {joint, _, paddingObject} from '../../configuration/rappidEnviromentFunctionality/shared';
import {min} from "rxjs/operator/min";
const $ = require('jquery');

export  class OpmState extends OpmEntity {
  constructor(stateName = 'State') {
    super();
    this.set(this.stateAttributes());
    if (typeof stateName === 'string')
      this.attr(this.stateAttrs(stateName));
    else
      this.attr(this.stateAttrs(stateName['attrs'].text.text));
  }
  stateAttributes() {
    return {
      markup: '<image/><g class="rotatable"><g class="scalable"><rect class="outer"/><rect class="inner"/></g><text/></g>',
      type: 'opm.State',
      size: {width: 60, height: 30},
      minSize: {width: 60, height: 30},
      'father': null,
    };
  }
  innerOuter() {
    const param = {
      stroke: '#808000',
      rx: 5,
      ry: 5,
    };
    return {...this.entityShape(), ...param};
  }
  createInner() {
    return {
      'stroke-width': 0 ,
      width: 60,
      height: 30,
      'ref-x': .5, 'ref-y': .5,
      'x-alignment' : 'middle' ,
      'y-alignment' :  'middle',
    };
  }
  createOuter() {
    return{
      width: 70,
      height: 40,
    };
  }
  stateAttrs(stateName) {
    return {
      '.outer': {...this.innerOuter(), ...this.createOuter()},
      '.inner': {...this.innerOuter(), ...this.createInner()},
      'text' : {text: stateName, 'font-weight': 300},
      'image': {'xlink:href' : '../../../assets/icons/OPM_Links/DefaultState.png',display:'none', 'ref-x': 1, 'ref-y':1,  x: -18, y: -18,ref: 'rect', width: 25, height: 25 }
    };
  }
  getParams() {
    const params = {
      fill: this.attr('rect/fill'),
      strokeColor: this.attr('rect/stroke'),
      strokeWidth: this.attr('rect/stroke-width'),
      fatherObjectId: this.get('father')
    };
    return {...super.getEntityParams(), ...params};
  }
  changeSizeHandle() {
    super.changeSizeHandle();
    // Need to update the size of it's object so that the state will not
    // stay out of it's border
    const parentId = this.get('parent');
    const parent = this.graph.getCell(parentId);
    parent.updateSizeToFitEmbeded();
    // update inner and outer frames size
    const width = this.get('size').width;
    const height = this.get('size').height;
    const diff = Math.max(0.15 * width, 0.15 * height);
    this.attr('.inner', {width: this.get('size').width, height: this.get('size').height});
    this.attr('.outer', {width: (this.get('size').width + diff), height: (this.get('size').height + diff)});
  }
  changePositionHandle() {
    super.changePositionHandle();
    // When state is changing it's position, the object need to change it's size accordingly
    const parentId = this.get('parent');
    const parent = this.graph.getCell(parentId);
    parent.updateSizeToFitEmbeded();
  }
  getParent() {
    const parentId = this.get('parent');
    const parent = this.graph.getCell(parentId);
    return parent;
  }
  removeHandle(options) {
    const fatherObject = options.graph.getCell(this.get('father'));
    if (fatherObject.get('embeds').length === 0) {
      fatherObject.arrangeEmbededParams(0.5, 0.5, 'middle', 'middle', 'bottom', 0, 0);
      fatherObject.updateTextAndSize();
      // if the state was a value of the object then delete the value from the object
      if (fatherObject.attr('value/value')) {
        fatherObject.attr({value: {value: 'None'}});
        fatherObject.set('previousValue', null);
        fatherObject.set('logicalValue', null);
      }
    } else {
      arrangeEmbedded(fatherObject, fatherObject.attr('statesArrange'));
    }
  }
  haloConfiguration(halo, options) {
    super.haloConfiguration(halo, options);
    const Dcheckbox = '<input id="Default" class="Default" name="Default" type="checkbox"' +
      ((this.attr('image/display') === 'flex') ? ' checked' : '') + '> <label for="Default">Default</label>';
    const Icheckbox = '<input  id="Initial" class="Initial" name="Initial" type="checkbox" ' +
      ((this.attr('.outer/stroke-width') === 3) ? ' checked' : '') + '> <label for="Initial">Initial</label>';
    const Fcheckbox = '<input id="Final" class="Final" name="Final" type="checkbox" ' +
      (this.attr('.inner/stroke-width') === 2 ? ' checked' : '') + '> <label for="Final">Final</label>';
    halo.addHandle(this.addHandleGenerator('stateType', 'sw', 'Click to define state type', 'right'));
    halo.on('action:stateType:pointerup', function () {
      const cellModel = this.options.cellView.model;
      // access properties using this keyword
      const popupEvents = {
        'click .Default': function toggleCheckboxD() {
          const DcheckInput = (<HTMLInputElement>document.getElementById('Default')).checked ? 'flex' : 'none';
          cellModel.attr('image/display', DcheckInput); },
        'click .Initial': function toggleCheckboxI() {
          const IcheckedInput =  (<HTMLInputElement>document.getElementById('Initial')).checked ? 3 : 2;
          cellModel.attr('.outer/stroke-width', IcheckedInput); },
        'click .Final': function toggleCheckboxF() {
          const FcheckedInput =  (<HTMLInputElement>document.getElementById('Final')).checked ? 2 : 0;
          cellModel.attr('.inner/stroke-width', FcheckedInput); },
      };
      const popupContent = ['<form>', Dcheckbox, Icheckbox, Fcheckbox, '</form>'].join('');
      this.options.cellView.model.popupGenerator(this.el, popupContent, popupEvents).render();
    });
  }
  updateShapeAttr(newValue) {
    this.attr('.inner', newValue);
    this.attr('.outer', newValue);
  }
  getShapeFillColor() {
    return this.attr('.inner/fill');
  }
  getShapeOutline() {
    return this.attr('.inner/stroke');
  }
}
