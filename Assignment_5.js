const url = "https://pokeapi.co/api/v2/ability/battle-armor";

async function fetchAbility(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed | URL: ${url} | Status: ${response.status}`);
        }
        const data = await response.json();
        return {
            abilityName: data.name,
            effect: data.effect_entries[0]?.effect || "No effect description"
        
        };
    } catch (error) {
        throw error;
    }
}

// Promise.all
const abilitiesAll = ["battle-armor", "chlorophyll", "overgrow"];
const requestsAll = abilitiesAll.map(name => 
    fetchAbility(`https://pokeapi.co/api/v2/ability/${name}`)
);

Promise.all(requestsAll)
    .then(results => console.log("[Promise.all] All abilities fetched:", results))
    .catch(error => console.error("[Promise.all] One of the abilities failed:", error.message));


// Promise.allSettled
const abilitiesSettled = ["battle-armor", "wrong-ability", "blaze"];
const requestsSettled = abilitiesSettled.map(name => 
    fetchAbility(`https://pokeapi.co/api/v2/ability/${name}`)
);

Promise.allSettled(requestsSettled)
    .then(results => {
        const successful = results.filter(r => r.status === "fulfilled");
        console.log("[Promise.allSettled] Successful abilities:", successful.map(s => s.value));

        const failed = results.filter(r => r.status === "rejected");
        if (failed.length > 0) {
            console.warn("[Promise.allSettled] Failed requests:", failed.map(f => f.reason.message));
        }
    });


// Promise.race
const fastAbilityURL = `https://pokeapi.co/api/v2/ability/battle-armor`;
const fakeSlowAbilityURL = `https://fakeapi.co/api/v2/ability/battle-armor`;

Promise.race([
    fetchAbility(fakeSlowAbilityURL),
    fetchAbility(fastAbilityURL)
])
.then(result => console.log("[Promise.race] First completed ability:", result))
.catch(error => console.error("[Promise.race] First request failed:", error.message));


// Promise.any
const abilityServersAny = [
    `https://fakeapi.co/api/v2/ability/blaze`,
    `https://pokeapi.co/api/v2/ability/battle-armor`,
    `https://wrongapi.co/api/v2/ability/overgrow`
];

Promise.any(abilityServersAny.map(url => fetchAbility(url)))
    .then(result => console.log("[Promise.any] First successful ability:", result))
    .catch(error => {
        if (error instanceof AggregateError) {
            console.error("[Promise.any] All requests failed. Reasons:", error.errors.map(e => e.message));
        } else {
            console.error("[Promise.any] Unexpected error:", error);
        }
    });

