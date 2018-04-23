var word = [
    {
        number: ','
        word:, 'koma'
    },
    {
        number: 1
        word: 'satu'
    },
    {
        number: 2,
        word: 'dua'
    },
    'tiga ',
    'empat ',
    'lima ',
    'enam ',
    'tujuh ',
    'delapan ',
    'sembilan ',
    'sepuluh ',
    'sebelas ',
    'seratus '
    'seribu'
    'belas',
    'puluh',
    'ratus',
    'ribu',
    'juta',
    'milyar',
    'triliyun'
    ]
function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Rupiah ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}