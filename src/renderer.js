const N = {
        T: {
            INFO: 'info',
            SUCCESS: 'success',
            ERROR: 'error',
            WARNING: 'warning'
        },
        D: 2e3,
        F: 400
    },
    E = {
        n: document.getElementById('notification'),
        r: document.getElementById('roomLink'),
        c: document.getElementById('copyButton'),
        b: document.getElementById('createRoom'),
        v: document.getElementById('videoUrl')
    },
    q = [],
    notify = (m, t = N.T.INFO, d = N.D) => {
        q.push({
            m,
            t,
            d
        });
        !showing && showNext()
    },
    showNext = () => {
        if (!q.length) return showing = false;
        showing = true;
        const {
            m,
            t,
            d
        } = q.shift();
        E.n.textContent = m;
        E.n.className = `notification notification-${t} notification-show`;
        E.n.style.opacity = 1;
        setTimeout(() => {
            E.n.style.opacity = 0;
            setTimeout(() => {
                E.n.classList.remove('notification-show');
                showNext()
            }, N.F)
        }, d)
    },
    copy = async t => {
        try {
            await navigator.clipboard.writeText(t);
            notify('Link copied!', N.T.SUCCESS)
        } catch {
            notify('Copy failed', N.T.ERROR)
        }
    }, createRoom = async () => {
        const u = E.v.value.trim();
        if (!u) return notify('Enter URL', N.T.WARNING);
        try {
            E.r.value = await window.electron.invokeCreateRoom(u);
            E.r.style.display = 'block';
            E.c.style.display = 'inline-block';
            notify('Room created!', N.T.SUCCESS)
        } catch (e) {
            E.r.value = `Error: ${e.message}`;
            E.r.style.display = 'block';
            E.c.style.display = 'none';
            notify('Create failed', N.T.ERROR)
        }
    };
let showing = false;
E.b.addEventListener('click', createRoom);
E.c.addEventListener('click', () => E.r.value ? copy(E.r.value) : notify('No link', N.T.WARNING));
E.v.addEventListener('keydown', e => e.key === 'Enter' && createRoom());
E.r.style.display = E.c.style.display = 'none';
