import MapLocationControlIcon from "../../canvas/map-location-control-icon.mjs";

/**
 * Data definition for Map Location journal entry pages.
 *
 * @property {string} code  Code for the location marker on the map.
 */
export default class MapLocationJournalPageData extends foundry.abstract.DataModel {

  /** @inheritDoc */
  static defineSchema() {
    return {
      code: new foundry.data.fields.StringField()
    };
  }

  /* -------------------------------------------- */

  /**
   * Adjust the number of this entry in the table of contents.
   * @param {number} number  Current position number.
   * @returns {{ number: string, adjustment: number }|void}
   */
  adjustTOCNumbering(number) {
    if ( !this.code ) return;
    return { number: this.code, adjustment: -1 };
  }

  /* -------------------------------------------- */

  /**
   * Create a control icon for rendering this page on a scene.
   * @param {object} options  Options passed through to ControlIcon construction.
   * @returns {PIXI.Container|void}
   */
  getControlIcon(options) {
    if ( !this.code ) return;
    const style = foundry.utils.mergeObject(
      CONFIG.DND5E.mapLocationMarker.default,
      CONFIG.DND5E.mapLocationMarker[this.parent.getFlag("dnd5e_custom", "mapMarkerStyle")] ?? {},
      {inplace: false}
    );
    return new MapLocationControlIcon({code: this.code, ...options, ...style});
  }
}
