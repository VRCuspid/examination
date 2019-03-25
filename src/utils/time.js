const init = {
    toLast(time){
        let hour = Math.floor(time/1000/60/60);
        let min = Math.floor(time/1000/60%60);
        let second = Math.floor(time/1000%60);
        return this.addZero(hour)+':'+this.addZero(min)+':'+this.addZero(second)
    },
    addZero(num){
        return num>9 ? ""+num : '0'+num;
    }
}

export default init