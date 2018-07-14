import UUID from "./UUID";

const _click = Symbol('_click');

class Dialog {
    constructor() {
        this.tar = '';
        this.con = '';
        this.id = UUID.GenerateUUID();
        this[_click] = this._onClickListener.bind(this);
        this.createDialogElement();
    }
    //构造Dialog的HTML结构
    createDialogElement() {
        this.tar = document.createElement('div');
        this.con = document.createElement('div');
        this.tar.classList.add('edit-panel-cover');
        this.con.classList.add('edit-panel');
        this.con.id = this.id;
        this.tar.appendChild(this.con);
        document.body.appendChild(this.tar);
        this.tar.addEventListener('click', this[_click], false);
    }
    //构造Dialog的Element结构
    createContentElement(data) {
        this.con.innerHTML =
            `
                <div class="panel-header">${data.id}</div>
                <div class="panel-body" >${data.value}</div>
                <div class="panel-footer">
                    <button class="btn" data-name="cancel">取消</button>
                    <button class="btn" data-name="confirm">确定</button>
                </div>
            `;
    }
    show(data, callback) {
        this.createContentElement(data);
        this.tar.classList.add('active');
        this.callback = callback;
    }

    hide() {
        this.tar.classList.remove('active');
    }

    _onClickListener(event) {
        event.preventDefault();
        let target = event.target.getAttribute('data-name');
        if (!target) return
        switch (target) {
            case 'cancel':
                this.hide();
                break;
            default:
                try {
                    this.callback()
                }
                catch (e) {}
        }
    }

}

export default Dialog;