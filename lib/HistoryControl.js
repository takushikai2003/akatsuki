window.addEventListener('popstate', (e) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const page = params.get("scene");

    switch(page){
        case "select_lesson":
            new LessonSelect(document.body);
            break;
    }
});