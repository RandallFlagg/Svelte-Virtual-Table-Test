<script>
    import VirtualTable from "svelte-virtual-table";

    let items = $state([]);

    async function getData() {
        let dataItems = [];
        for (let page = 1; page < 5; page++) {
            let res = await fetch(
                `https://node-hnapi.herokuapp.com/news?page=${page}`,
            );
            let data = await res.json();
            dataItems = dataItems.concat(data);
        }
        items = dataItems;
        return items;
    }

    const dataPromise = getData();

    // TWO variables that can be bound to the VirtualTable
    let start = $state(0); // the index of the first visible item
    let end = $state(0); // the index of the last visible item
</script>

{#await dataPromise}
    Loading...
{:then}
    <VirtualTable {items} class="anyClassIWantToAdd" bind:start bind:end>
        {#snippet thead()}
            <tr>
                <th data-sort="title">Title</th>
                <th data-sort="user">User</th>
                <th data-sort="domain">Domain</th>
                <th data-sort="time" data-sort-initial="descending">Time ago</th
                >
                <th data-sort="comments_count">Comments</th>
            </tr>
        {/snippet}
        {#snippet trow(item, index)}
            <tr>
                <td>
                    <a href={item.url} target="_blank">{item.title}</a>
                </td>
                <td>{item.user}</td>
                <td>{item.domain}</td>
                <td>{item.time_ago}</td>
                <td>{item.comments_count}</td>
            </tr>
        {/snippet}
    </VirtualTable>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
