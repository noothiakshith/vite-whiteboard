export function distanceBetweenPoints(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

export function isPointCloseToLine(A, B, P, threshold = 0.1) {
  const distAP = distanceBetweenPoints(A, P);
  const distBP = distanceBetweenPoints(B, P);
  const distAB = distanceBetweenPoints(A, B);
  return Math.abs(distAP + distBP - distAB) < threshold;
}

export function isPointNearElement(point, element, context) {
  switch (element.type) {
    case 'line':
    case 'arrow':
      return isPointCloseToLine(
        { x: element.x1, y: element.y1 },
        { x: element.x2, y: element.y2 },
        point
      );
    case 'rectangle':
      const rectLines = [
        [{ x: element.x1, y: element.y1 }, { x: element.x2, y: element.y1 }],
        [{ x: element.x2, y: element.y1 }, { x: element.x2, y: element.y2 }],
        [{ x: element.x2, y: element.y2 }, { x: element.x1, y: element.y2 }],
        [{ x: element.x1, y: element.y2 }, { x: element.x1, y: element.y1 }],
      ];
      return rectLines.some(([A, B]) => isPointCloseToLine(A, B, point));
    case 'circle':
      const cx = (element.x1 + element.x2) / 2;
      const cy = (element.y1 + element.y2) / 2;
      const width = element.x2 - element.x1;
      const height = element.y2 - element.y1;
      const ellipseLines = [
        [{ x: cx - width / 2, y: cy }, { x: cx + width / 2, y: cy }],
        [{ x: cx, y: cy - height / 2 }, { x: cx, y: cy + height / 2 }],
      ];
      return ellipseLines.some(([A, B]) => isPointCloseToLine(A, B, point));
    case 'brush':
      const path = new Path2D(element.path);
      return context.isPointInPath(path, point.x, point.y);
    case 'text':
      context.font = `${element.size}px Roboto, sans-serif`;
      const metrics = context.measureText(element.text || '');
      return (
        point.x >= element.x1 &&
        point.x <= element.x1 + metrics.width &&
        point.y >= element.y1 - element.size &&
        point.y <= element.y1
      );
    default:
      return false;
  }
}