
let names = ["Akira", "Buzz", "Chani", "Deku", "Eren", "Frank", "Goku", "Harry", "Iggy", "Jack", "Koopa", "Leon", "Mario", "Nobi", "Olaf", "Pole", "Queen", "Rama", "Sena", "T-800", "Usopp", "Vader", "Wick", "Xmen", "Yoda", "Zoro"];

function addRow() {
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length; // 合計行を含む行数
    var newRow = table.insertRow(rowCount - 1); // 合計行の前に新しい行を追加
    var columnCount = table.rows[0].cells.length; // 列の数を取得

    for (var i = 0; i < columnCount; i++) {
        var cell = newRow.insertCell(i);
        if (i === 0) {
            // 最初のセルに行削除ボタンを追加
            cell.innerHTML = `<input type="text" name="column${i}[]"  placeholder="VP" ><button class="delete-btn" onclick="removeRow(this)"><i class="fas fa-trash"></i></button>`;
        } else {
            // その他のセルに入力フィールドを追加
            cell.innerHTML = `<input type="number" name="column${i}[]" oninput="updateSum()" placeholder="0点" ">`;
        }
    }
    saveTableData();
}



function addColumn() {
    var table = document.getElementById("myTable");
    var rows = table.rows;
    var columnCount = rows[0].cells.length; // 現在の列の数

    // ヘッダー行に新しいヘッダーセルを追加
    var headerCell = document.createElement("th");
    var headerName = names[(columnCount-1) % names.length] || `Column ${columnCount}`;
    headerCell.innerHTML = `<input type="text" name="column${columnCount}[]" placeholder="${headerName}" ">
                            <button class="delete-btn" onclick="removeColumn(this)"><i class="fas fa-trash"></i></button>`;

    rows[0].appendChild(headerCell);

    // 各データ行に新しいセルを追加
    for (var i = 1; i < rows.length; i++) { // 合計行も含める
        var newCell = rows[i].insertCell(-1);
        if (i < rows.length - 1) {
            newCell.innerHTML = `<input type="number" name="column${columnCount}[]" placeholder="0点" oninput="updateSum()" ">`;
        } else {
            // 合計行に新しいセルを追加
            newCell.className = "totalCell";
            newCell.innerHTML = "0点";
        }
    }
    saveTableData();

}



function updateSum() {
    var table = document.getElementById("myTable");
    var rows = table.rows;
    var columnTotals = [];

    for (let colIndex = 1; colIndex < rows[0].cells.length; colIndex++) {
        rows[0].cells[colIndex].classList.remove("icon-background-cell");
        let total = 0;
        for (let rowIndex = 1; rowIndex < rows.length - 1; rowIndex++) {
            let cell = rows[rowIndex].cells[colIndex];
            let input = cell.querySelector('input[type="number"]');
            if (input) {
                total += parseFloat(input.value) || 0;
            }
        }
        columnTotals.push(total);

        let totalCells = table.querySelectorAll('.totalCell');
        if (totalCells && totalCells.length >= colIndex) {
            //totalCells[colIndex - 1].textContent = total + '点';
            totalCells[colIndex - 1].innerHTML = total + '<span style="font-size: 0.5em;">点</span>';
        }
    }
    if (!columnTotals.every(value => value === 0)) {
        // 最も高い合計を見つける
        let highestTotal = Math.max(...columnTotals);

        // 最高値と等しい全ての列にクラスを追加
        columnTotals.forEach((total, index) => {
            if (total === highestTotal) {
                rows[0].cells[index + 1].classList.add("icon-background-cell");
            }
        });
    }
    saveTableData();

}




// 行または列の入力値が変更されたときに合計を更新するための関数を呼び出す
function addInputEventListeners() {
    var table = document.getElementById("myTable");
    var inputs = table.querySelectorAll('input[type="number"]'); // 数値入力フィールドに限定

    inputs.forEach(function (input) {
        input.removeEventListener('input', updateSum); // 既存のリスナーを削除
        input.addEventListener('input', updateSum); // 新しいリスナーを追加
    });

}


function clearPoints() {
    var table = document.getElementById("myTable");
    for (var i = 1; i < table.rows.length; i++) { // 合計行を除外
        for (var j = 1; j < table.rows[i].cells.length; j++) { // 最初の列を除外
            var cell = table.rows[i].cells[j];
            var input = cell.getElementsByTagName('input')[0];
            if (input) {
                input.value = ''; // 値をクリア
            }
        }
    }
    updateSum();
}
function clearPointsCategpries() {
    var table = document.getElementById("myTable");
    for (var i = 1; i < table.rows.length; i++) { // 合計行を除外
        var cell = table.rows[i].cells[0];
        var input = cell.getElementsByTagName('input')[0];
        if (input) {
            input.value = ''; // 値をクリア
        }
    }
    saveTableData();

}

function clearNames() {
    var table = document.getElementById("myTable");
    for (var j = 1; j < table.rows[0].cells.length; j++) { // 最初の列を除外
        var cell = table.rows[0].cells[j];
        var input = cell.getElementsByTagName('input')[0];
        if (input) {
            input.value = ''; // 値をクリア
        }
    }
    updateSum();
}
function clearAll() {
    var table = document.getElementById("myTable");
    for (var i = 0; i < table.rows.length; i++) { // 合計行を除外
        for (var j = 0; j < table.rows[i].cells.length; j++) { // 最初の列を除外
            var cell = table.rows[i].cells[j];
            var input = cell.getElementsByTagName('input')[0];
            if (input) {
                input.value = ''; // 値をクリア
            }
        }
    }
    updateSum();
}



function removeColumn(button) {
    var table = document.getElementById("myTable");
    var columnIndex = button.closest('td, th').cellIndex; // 正しい列インデックスを取得
    //var columnIndex = button.parentNode.cellIndex;

    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].deleteCell(columnIndex);
    }
    saveTableData();
    updateSum();

}

function removeRow(button) {
    var row = button.parentNode.parentNode;
    var rowIndex = row.rowIndex;
    document.getElementById("myTable").deleteRow(rowIndex);
    saveTableData();
    updateSum();

}



function saveTableData() {
    var tableData = document.getElementById("myTable").innerHTML;
    var storedData = localStorage.getItem("tableData");
    var tableDataArray = storedData ? JSON.parse(storedData) : [];

    if (tableDataArray.length === 0) {
        tableDataArray.push(tableData);  // 初期状態を保存
    }

    tableDataArray[1] = tableData;  // 変更後の状態を保存
    //console.log("tableDataArray[1]"+tableDataArray[1])

    localStorage.setItem("tableData", JSON.stringify(tableDataArray));
}


// リセットボタンの機能
function resetButton(button) {
    var storedData = localStorage.getItem("tableData");
    if (storedData) {
        var tableDataArray = JSON.parse(storedData);
        document.getElementById("myTable").innerHTML = tableDataArray[0]; // 初期状態に戻す

        // 変更後の状態をリセット
        tableDataArray[1] = tableDataArray[0];
        localStorage.setItem("tableData", JSON.stringify(tableDataArray));

        updateSum(); // 合計を更新
        addInputEventListeners(); // イベントリスナーを再設定
    }
    saveTableData();

}



function loadTableData() {
    var storedData = localStorage.getItem("tableData");
    if (storedData) {
        var tableDataArray = JSON.parse(storedData);
        //console.log("tableDataArray"+tableDataArray)
        var currentTableData = tableDataArray[1] || tableDataArray[0];
        document.getElementById("myTable").innerHTML = currentTableData;
    }
}

// ページ読み込み後にイベントリスナーを追加
window.onload = function () {

    saveTableData();
    loadTableData();
    addInputEventListeners();
};
