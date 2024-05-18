class CanvasHandler {
    constructor(ctx, canvas) {
      this.ctx = ctx;
      this.canvas = canvas;
    }
  
    init(templateData, bgColor, captionText, ctaText, image) {
      this.clearCanvas();
      this.drawBackground(bgColor);
      this.drawDesignPattern(templateData.urls.design_pattern);
      this.drawImageMask(templateData, image);
      this.drawMaskStroke(templateData.urls.stroke);
      this.drawText(templateData, captionText, ctaText);
    }
  
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    drawBackground(color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    drawDesignPattern(url) {
      const patternImage = new Image();
      patternImage.src = `${url}?random=${Math.random()}`;
      patternImage.onload = () => {
        this.ctx.drawImage(patternImage, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  
    drawImageMask(templateData, imageSrc) {
      if (!imageSrc) return;
  
      const maskImage = new Image();
      maskImage.src = `${templateData.urls.mask}?random=${Math.random()}`;
      const userImage = new Image();
      userImage.src = imageSrc;
  
      userImage.onload = () => {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(
          templateData.image_mask.x,
          templateData.image_mask.y,
          templateData.image_mask.width,
          templateData.image_mask.height
        );
        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.drawImage(
          userImage,
          templateData.image_mask.x,
          templateData.image_mask.y,
          templateData.image_mask.width,
          templateData.image_mask.height
        );
        this.ctx.restore();
        this.ctx.drawImage(maskImage, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  
    drawMaskStroke(url) {
      const strokeImage = new Image();
      strokeImage.src = `${url}?random=${Math.random()}`;
      strokeImage.onload = () => {
        this.ctx.drawImage(strokeImage, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  
    drawText(templateData, captionText, ctaText) {
      this.drawCaption(templateData.caption, captionText);
      this.drawCTA(templateData.cta, ctaText);
    }
  
    drawCaption(caption, text) {
      const words = text.split(' ');
      let line = '';
      const lines = [];
      this.ctx.font = `${caption.font_size}px Arial`;
      this.ctx.fillStyle = caption.text_color;
      this.ctx.textAlign = caption.alignment;
  
      words.forEach((word) => {
        const testLine = `${line}${word} `;
        const metrics = this.ctx.measureText(testLine);
        const testWidth = metrics.width;
  
        if (testWidth > caption.max_characters_per_line * caption.font_size / 2) {
          lines.push(line);
          line = `${word} `;
        } else {
          line = testLine;
        }
      });
      lines.push(line);
  
      lines.forEach((line, index) => {
        this.ctx.fillText(line, caption.position.x, caption.position.y + (index * caption.font_size));
      });
    }
  
    drawCTA(cta, text) {
      const padding = 24;
      const fontSize = cta.font_size || 30;
      this.ctx.font = `${fontSize}px Arial`;
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = cta.background_color;
  
      const textWidth = this.ctx.measureText(text).width;
      const rectX = cta.position.x - (textWidth / 2) - padding;
      const rectY = cta.position.y - fontSize - padding / 2;
      const rectWidth = textWidth + 2 * padding;
      const rectHeight = fontSize + padding;
  
      this.ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
  
      this.ctx.fillStyle = cta.text_color;
      this.ctx.fillText(text, cta.position.x, cta.position.y);
    }
  }
  
  export default CanvasHandler;
  