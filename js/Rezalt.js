window.onload = function(){
    const yourscore = localStorage.getItem('myscore');
    document.getElementById('your-score').textContent = yourscore;
    const cpuscore = localStorage.getItem('enemyscore');
    document.getElementById('cpu-score').textContent = cpuscore;

}