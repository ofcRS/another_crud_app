export const asyncFnToGenerator = <R>(fn: () => Promise<R>) =>
    /*Делаем из асинк функции генератор тайпингов в экшенах mst*/
    function*() {
        return (yield fn()) as R;
    };
