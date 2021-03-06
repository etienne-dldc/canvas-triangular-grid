import { Renderable, connect } from '../types';
import TriangularGrid from '../state/TriangularGrid';
import ColorHlsaModel from '../state/ColorHslaModel';
import AnimatedModel from '../state/AnimatedModel';

export type Props = {
  coord: TriangularGrid.Coordinate;
  color: ColorHlsaModel;
};

const Triangle: Renderable<Props> = ({ ctx, width, height, state, grid, coord, t, color }) => {
  const { xbtm, xlft, xrgh, xtop } = grid.resolveRectangularSquare(coord);
  // if (xtop.y > (height - 20) / 2) {
  //   return;
  // }
  // if (xbtm.y < -(height - 20) / 2) {
  //   return;
  // }
  // if (xlft.x < -(width - 20) / 2) {
  //   return;
  // }
  // if (xrgh.x > (width - 20) / 2) {
  //   return;
  // }
  const alpha = AnimatedModel.resolve(color.alpha, t);
  if (alpha === 0) {
    return;
  }
  const lightness = AnimatedModel.resolve(color.lightness, t);
  if (lightness === 100) {
    return;
  }

  ctx.beginPath();
  ctx.moveTo(xtop.x, xtop.y);
  ctx.lineTo(xbtm.x, xbtm.y);
  if (coord.side === 'l') {
    ctx.lineTo(xlft.x, xlft.y);
  } else {
    ctx.lineTo(xrgh.x, xrgh.y);
  }
  ctx.closePath();
  ctx.fillStyle = ColorHlsaModel.toString(color, t);
  ctx.fill();
};

export default connect(Triangle);
