class WorkSpace {
    constructor() {
        this.ctx = '';
    }

    createCanvas(id = '_id_default') {
        let canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.classList = "spaces";
        canvas.width = document.body.offsetWidth;
        canvas.height = document.body.offsetHeight;
        document.body.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
        return this.ctx;
    }

    attachLines(type, name, from, to) {
        let id = 'L10000001';
        this.ctx.beginPath();
        this.ctx.moveTo(75, 25);
        this.ctx.quadraticCurveTo(25, 25, 25, 62.5);
        this.ctx.quadraticCurveTo(25, 100, 50, 100);
        this.ctx.quadraticCurveTo(50, 120, 30, 125);
        this.ctx.quadraticCurveTo(60, 120, 65, 100);
        this.ctx.quadraticCurveTo(125, 100, 125, 62.5);
        this.ctx.quadraticCurveTo(125, 25, 75, 25);
        this.ctx.stroke();
        return id;
    }

    attachNode(type, name) {

    }
}

export default new WorkSpace();
