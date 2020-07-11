function closeAlert() {
    document.getElementById("materialert").remove();
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, { hover: true, alignment: 'right', autoTrigger: false });
});