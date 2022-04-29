
export function Animate (id,ind,inp,Input){
    console.log(Input[ind].a);
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    if(inp==0){
    if(Input[ind].a==1){
        ctx.lineWidth=2.8;
        ctx.fillStyle = 'white';
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 80);
        ctx.fillStyle = 'red';
        ctx.lineWidth=25;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 80);
    }
}
}