class Box{
    constructor(x, y, w, h, char){
        let options = {
            friction: 0.1,
            restitution: 1,
            frictionAir: 0.1,
            slop: 0,
            timeScale: 0.5
        }
        this.padding = h/15;
        this.x = x;
        this.y = y;
        this.char = char;
        this.w = w;
        this.fontSize = h;
        // this.fSize = h*2;
        this.txta = textHeight(this.char, h, 'yes', undefined, undefined);
	    this.txtb = textHeight(this.char, h, undefined, 'yes', undefined);
        this.txta *= 1.6;
        this.txtb *= 1.6;
        // this.txth = (this.txta + this.txtb);

        this.body = Bodies.rectangle(this.x, this.y, this.w + this.padding * 3, this.txta + this.txtb + this.padding * 3, options);
        Composite.add(world, this.body);


        //pick colors
        this.colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];
        this.r = int(random(5));
        this.c = color(this.colors[this.r]);
        this.colors.splice(this.r, 1);
        this.r = int(random(4));
        this.c2 = color(this.colors[this.r]);
        
    }

    remove(){
        Composite.remove(world, this.body);
    }

    updateSize(){
        this.remove();
        this.fontSize = fontSize;
        this.txta = textHeight(this.char, h, 'yes', undefined, undefined);
	    this.txtb = textHeight(this.char, h, undefined, 'yes', undefined);
        this.txta *= 1.6;
        this.txtb *= 1.6;
        this.txth = (this.txta + this.txtb);
        this.body = Bodies.rectangle(pos.x, pos.y, this.w + this.padding * 3, this.txta + this.txtb + this.padding * 3, options);
        Composite.add(world, this.body);
    }
    

    show(){
        fill(0);
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        fill(this.c);
        translate(pos.x, pos.y);
        rotate(angle);

        rectMode(CENTER); 

        fill(this.c);
        rect(0, 0, this.w + this.padding * 3, this.txta + this.txtb + this.padding * 3);

        fill(this.c2);
        // fill(255);
        textAlign(LEFT,CENTER);
        if(this.txta > this.fontSize * 2.5/4){
            text(this.char, -this.w/2, -this.fontSize * 0.14);
        } else if(this.txtb > this.fontSize * 0.1){
            text(this.char, -this.w/2, -this.fontSize * 0.34);
        } else{
            text(this.char, -this.w/2, - this.fontSize * 0.23);
        }
        pop();
    }
}