const members = [];
let phases = [];

const memberInput = document.getElementById('memberInput');
const setMembersBtn = document.getElementById('setMembersBtn');
const phaseCountInput = document.getElementById('phaseCount');
const setPhasesBtn = document.getElementById('setPhasesBtn');
const phaseTitlesContainer = document.getElementById('phaseTitlesContainer');
const tbody = document.querySelector('#ganttTable tbody');

document.getElementById('setMemberCountBtn').addEventListener('click', () => {
    const count = Number(document.getElementById('memberCount').value);
    const container = document.getElementById('memberNamesContainer');
    container.innerHTML = ''; // クリア

    for(let i = 1; i <= count; i++){
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `メンバー${i}の名前`;
        input.style.marginBottom = '6px';
        input.style.width = '100%';
        container.appendChild(input);
    }
    document.getElementById('registerMembersBtn').style.display = 'block'; // 登録ボタンを表示
});

document.getElementById('registerMembersBtn').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#memberNamesContainer input');
    const names = [];
    inputs.forEach(input => {
        if(input.value.trim() !== '') {
            names.push(input.value.trim());
        }
    });
    alert('登録されたメンバー: ' + names.join(', '));
    // ここで名前の配列を処理するコードに変更してください
});


setPhasesBtn.addEventListener('click', () => {
    const count = parseInt(phaseCountInput.value);
    if(isNaN(count) || count < 1) {
        alert('1以上のフェーズ数を入力してください');
        return;
    }
    phases = [];
    phaseTitlesContainer.innerHTML = '';
    for(let i=0; i<count; i++) {
        // フェーズタイトル入力欄を作成
        const div = document.createElement('div');
        div.innerHTML = `フェーズ${i+1}タイトル: <input type="text" class="phase-title-input" data-index="${i}" placeholder="フェーズタイトルを入力してください">`;
        phaseTitlesContainer.appendChild(div);
        phases.push('');
    }

    // フェーズタイトルの入力に応じて状態を更新
    phaseTitlesContainer.querySelectorAll('.phase-title-input').forEach(input => {
        input.addEventListener('input', e => {
            const idx = e.target.dataset.index;
            phases[idx] = e.target.value;
            updateTable();
        });
    });

    updateTable();
});

function updateTable() {
    tbody.innerHTML = '';
    for(let i=0; i<phases.length; i++) {
        // フェーズタイトル行
        const trPhase = document.createElement('tr');
        trPhase.classList.add('phase-title');
        const tdPhase = document.createElement('td');
        tdPhase.colSpan = 5;
        tdPhase.textContent = phases[i] || `フェーズ${i+1}タイトル`;
        trPhase.appendChild(tdPhase);
        tbody.appendChild(trPhase);

        // フェーズ内のタスクの例（ここは空のタスク1行だけ入れてます。必要に応じて動的追加も可能）
        const trTask = document.createElement('tr');

        // Task（テキスト入力）
        const tdTask = document.createElement('td');
        const inputTask = document.createElement('input');
        inputTask.type = 'text';
        inputTask.placeholder = 'タスク名';
        tdTask.appendChild(inputTask);
        trTask.appendChild(tdTask);

        // Member（select）
        const tdMember = document.createElement('td');
        const selectMember = document.createElement('select');
        members.forEach(m => {
            const option = document.createElement('option');
            option.value = m;
            option.textContent = m;
            selectMember.appendChild(option);
        });
        tdMember.appendChild(selectMember);
        trTask.appendChild(tdMember);

        // Progress（number＋棒グラフ）
        const tdProgress = document.createElement('td');
        const inputProgress = document.createElement('input');
        inputProgress.type = 'number';
        inputProgress.min = 0;
        inputProgress.max = 100;
        inputProgress.value = 0;
        inputProgress.classList.add('progress-input');

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');

        const progressFill = document.createElement('div');
        progressFill.classList.add('progress-fill');
        progressBar.appendChild(progressFill);

        inputProgress.addEventListener('input', (e) => {
            let val = e.target.value;
            if(val < 0) val = 0;
            if(val > 100) val = 100;
            e.target.value = val;
            progressFill.style.width = val + '%';
        });

        tdProgress.appendChild(inputProgress);
        tdProgress.appendChild(progressBar);
        trTask.appendChild(tdProgress);

        // Start（date）
        const tdStart = document.createElement('td');
        const inputStart = document.createElement('input');
        inputStart.type = 'date';
        tdStart.appendChild(inputStart);
        trTask.appendChild(tdStart);

        // End（date）
        const tdEnd = document.createElement('td');
        const inputEnd = document.createElement('input');
        inputEnd.type = 'date';
        tdEnd.appendChild(inputEnd);
        trTask.appendChild(tdEnd);

        tbody.appendChild(trTask);
    }
}
