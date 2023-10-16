class Letter{
    constructor(x, y, fontSize, char, hide){
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.char = char;
        fill(0);
        this.w = textWidth(this.char);
        this.hide = hide;
        this.hideFrame = 0;
        this.op = 0;
    }
    
    checkHover(){
        if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y - this.fontSize/2 && mouseY < this.y + this.fontSize/2){
            if(this.char != " " && this.hide.y == false){
                boxes.push(new Box(this.x + this.w/2, this.y, this.w, this.fontSize, this.char));
                if(boxes.length > 70){
                   boxes[0].remove();
                   boxes.splice(0, 1);
                }
                
            }
            this.hide.y = true;
            hiddenLetters[this.hide.x].y = true; 
            this.hideFrame = frameCount;
        }
    }

    show(){
        textAlign(LEFT, CENTER);
        stroke(2);
        noFill();
        fill(235);
        noStroke();
        
        push();
        if(this.hide.y == false){
            fill(230);
            text(this.char, this.x, this.y);
            this.checkHover();
        } else if(frameCount > this.hideFrame + 100 && frameCount <= this.hideFrame + 355){
            fill(230, this.op);
            this.op++;
            text(this.char, this.x, this.y);
            if(this.op == 100){
                this.hide.y = false;
                hiddenLetters[this.hide.x].y = false; 
                this.op = 0;
            }
        }
        pop();
        blendMode(BLEND);
    }
}