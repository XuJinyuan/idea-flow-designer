const _String4=Symbol('String4');
class UUID{
    static [_String4]() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1).toUpperCase();
    }
    static GenerateUUID(){
        let S4=this[_String4];
        return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
    }
}
export default UUID;