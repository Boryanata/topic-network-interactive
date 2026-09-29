# Mapping Themes Across Decades of CUNY Scholarship

An [interactive D3 topic network](https://boryanata.github.io/topic-network-interactive/) exploring recurring terms across **196 English-language dissertation abstracts** from a CUNY collection. The [portfolio case study](https://boryanaivanova.com/projects/mapping-cuny-dissertations.html) explains the research question and analysis process.

The network shows five human-labeled themes and 26 distinct terms. A term shared by multiple themes appears once, with a link to each related theme. Select a topic to see its primary dissertation count, strongest displayed terms, and three representative titles with years; select a term to see the themes it connects. Hover previews a relationship, while clicking keeps it selected. Keyboard users can focus nodes, press Enter or Space to select, and press Escape or use **View all topics** to reset.

## Data and interpretation

The source analysis examined 18,819 dissertation records, then focused on Spanish-classified dissertations with abstracts. Of 209 such abstracts, 196 were written in English and form the modeled corpus. A five-topic Gensim LDA model was fitted to preprocessed abstracts. The primary-topic counts are **21, 52, 45, 37, and 41**, totaling 196.

The original network contained 5 topic nodes, 26 deduplicated word nodes, and 45 links. Its front-end export did not contain term weights. The weights included here were recovered by rerunning the notebook's preprocessing and `LdaMulticore` settings (`num_topics=5`, `passes=5`, `workers=2`, `random_state=2026`) against the original data. That run reproduced the 196 modeled records and the five primary-topic counts. Two lower-ranked terms shifted position relative to the notebook's rounded printed output; all displayed link weights are actual model probabilities from the rerun.

Link thickness reflects a term's weight relative to the strongest displayed term *within that topic*. A shared word's size reflects its strongest relative association across its connected topics. These weights are **not** counts of dissertations containing a word. The topic names and short interpretations are analytical labels; the model did not assign them automatically. Representative titles and years come from the saved notebook output and are examples, not a complete catalog or a time-trend analysis.

The raw dissertation dataset and analysis notebook are not included in this visualization repository. `topic-data.js` contains only the graph, modeled weights, topic counts, interpretations, and 15 representative titles with years.

## Run locally

From the repository root, run `python3 -m http.server 8000`, then open `http://localhost:8000/`. No build step is needed. D3 7.9.0 is vendored from the original standalone export; Manrope loads from Google Fonts when available.
