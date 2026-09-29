(() => {
  "use strict";

  const data = window.topicNetworkData;
  const topics = new Map(data.topics.map(topic => [topic.id, topic]));
  const nodes = data.nodes.map(node => ({ ...node }));
  const links = data.links.map(link => ({ ...link }));
  const wordsByTopic = new Map(data.topics.map(topic => [topic.id, new Set()]));
  const topicsByWord = new Map();
  const highestWeightByTopic = new Map();

  links.forEach(link => {
    wordsByTopic.get(link.topic).add(link.target);
    if (!topicsByWord.has(link.target)) topicsByWord.set(link.target, new Set());
    topicsByWord.get(link.target).add(link.topic);
    highestWeightByTopic.set(link.topic, Math.max(highestWeightByTopic.get(link.topic) || 0, link.weight));
  });

  const svg = d3.select("#topic-network");
  const networkArea = document.querySelector(".network-area");
  const panel = document.querySelector("#panel-content");
  const kicker = document.querySelector("#panel-kicker");
  const status = document.querySelector("#selection-status");
  const resetButton = document.querySelector("#reset-selection");
  const linkLayer = svg.append("g").attr("aria-hidden", "true");
  const nodeLayer = svg.append("g");
  const countRange = d3.extent(data.topics, topic => topic.count);
  const topicLines = {
    0: ["Translation &", "textual tradition"],
    1: ["Subjectivity, politics", "& narrative"],
    2: ["Literature, history", "& political change"],
    3: ["Culture, politics", "& nation"],
    4: ["Spanish language", "& sociolinguistics"]
  };

  let width = 0;
  let height = 0;
  let narrow = false;
  let locked = null;
  let preview = null;

  const relativeWeight = link => link.weight / highestWeightByTopic.get(link.topic);
  const strongestWordWeight = word => d3.max(
    links.filter(link => (typeof link.target === "object" ? link.target.id : link.target) === word.id), relativeWeight
  );
  const wordRadius = word => (narrow ? 22 : 27) + 8 * Math.sqrt(strongestWordWeight(word));
  const wordHalfWidth = word => Math.max(wordRadius(word), word.id.length * (narrow ? 3 : 3.4) + 4);
  const topicWidth = topic => {
    const count = topics.get(topic.group).count;
    const fraction = (count - countRange[0]) / (countRange[1] - countRange[0]);
    return (narrow ? 184 : 218) + fraction * (narrow ? 16 : 22);
  };

  const linkElements = linkLayer.selectAll("line")
    .data(links)
    .join("line")
    .attr("class", "network-link")
    .attr("stroke-width", link => 1.15 + 2.65 * Math.sqrt(relativeWeight(link)));

  const nodeElements = nodeLayer.selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", node => `network-node ${node.type}`)
    .attr("role", "button")
    .attr("tabindex", 0)
    .attr("aria-pressed", "false")
    .attr("aria-label", node => node.type === "topic"
      ? `${node.id}. ${topics.get(node.group).count} dissertations primarily assigned. Select topic.`
      : `${node.id}. Connected to ${[...topicsByWord.get(node.id)].map(id => topics.get(id).label).join(", ")}. Select word.`);

  const wordNodes = nodeElements.filter(node => node.type === "word");
  wordNodes.append("circle").attr("class", "word-shape");
  wordNodes.filter(node => topicsByWord.get(node.id).size > 1)
    .append("circle").attr("class", "shared-rim");
  nodeElements.filter(node => node.type === "topic")
    .append("rect").attr("class", "topic-shape")
    .attr("y", -29).attr("height", 58).attr("rx", 16);

  nodeElements.append("text").each(function(node) {
    const label = d3.select(this);
    if (node.type === "word") {
      label.text(node.id);
    } else {
      topicLines[node.group].forEach((line, index) => {
        label.append("tspan")
          .attr("x", 0)
          .attr("y", index === 0 ? -8 : 8)
          .text(line);
      });
    }
  });

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(node => node.id).strength(0.34))
    .force("charge", d3.forceManyBody().strength(node => node.type === "topic" ? -320 : -125))
    .force("collide", d3.forceCollide().iterations(2))
    .on("tick", ticked);

  nodeElements
    .on("click", (event, node) => {
      event.stopPropagation();
      select(node);
    })
    .on("keydown", (event, node) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        select(node);
      }
    })
    .on("pointerenter", (event, node) => {
      if (!locked) {
        preview = keyFor(node);
        renderHighlights();
      }
    })
    .on("pointerleave", () => {
      if (!locked) {
        preview = null;
        renderHighlights();
      }
    })
    .on("focus", (event, node) => {
      if (!locked) {
        preview = keyFor(node);
        renderHighlights();
      }
    })
    .on("blur", () => {
      if (!locked) {
        preview = null;
        renderHighlights();
      }
    })
    .call(d3.drag()
      .filter(event => event.button === 0 && !window.matchMedia("(pointer: coarse)").matches)
      .on("start", (event, node) => {
        if (!event.active) simulation.alphaTarget(0.24).restart();
        node.fx = node.x;
        node.fy = node.y;
      })
      .on("drag", (event, node) => {
        node.fx = event.x;
        node.fy = event.y;
      })
      .on("end", (event, node) => {
        if (!event.active) simulation.alphaTarget(0);
        node.fx = null;
        node.fy = null;
      }));

  svg.on("click", event => {
    if (event.target === svg.node()) reset();
  });
  resetButton.addEventListener("click", reset);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && locked) reset();
  });

  function keyFor(node) {
    return node.type === "topic"
      ? { type: "topic", id: node.group }
      : { type: "word", id: node.id };
  }

  function select(node) {
    locked = keyFor(node);
    preview = null;
    renderHighlights();
    renderPanel();
    status.textContent = node.type === "topic"
      ? `${node.id} selected. ${topics.get(node.group).count} dissertations primarily assigned.`
      : `${node.id} selected. Connected to ${topicsByWord.get(node.id).size} themes.`;
  }

  function reset() {
    locked = null;
    preview = null;
    renderHighlights();
    renderPanel();
    status.textContent = "All five topics are visible.";
  }

  function renderHighlights() {
    const active = locked || preview;
    const visibleTopic = node => active.type === "topic"
      ? node.group === active.id
      : topicsByWord.get(active.id).has(node.group);
    const visibleWord = node => active.type === "topic"
      ? wordsByTopic.get(active.id).has(node.id)
      : node.id === active.id;

    nodeElements
      .classed("is-dimmed", node => active && !(node.type === "topic" ? visibleTopic(node) : visibleWord(node)))
      .classed("is-selected", node => locked && (node.type === "topic"
        ? locked.type === "topic" && node.group === locked.id
        : locked.type === "word" && node.id === locked.id))
      .attr("aria-pressed", node => String(Boolean(locked && (node.type === "topic"
        ? locked.type === "topic" && node.group === locked.id
        : locked.type === "word" && node.id === locked.id))));

    linkElements
      .classed("is-dimmed", link => active && !(active.type === "topic"
        ? link.topic === active.id
        : link.target.id === active.id))
      .classed("is-active", link => active && (active.type === "topic"
        ? link.topic === active.id
        : link.target.id === active.id));
  }

  function element(tag, className, text) {
    const result = document.createElement(tag);
    if (className) result.className = className;
    if (text !== undefined) result.textContent = text;
    return result;
  }

  function heading(text) {
    return element("h3", "", text);
  }

  function renderPanel() {
    panel.replaceChildren();
    if (!locked) {
      kicker.textContent = "Explore the network";
      const title = element("h2", "", "Five connected themes");
      title.id = "panel-title";
      panel.append(title, element("p", "", "Select a topic for its prevalence, strongest displayed terms, and representative dissertations. Select a word to see the themes it connects."));
      return;
    }

    if (locked.type === "word") {
      const related = [...topicsByWord.get(locked.id)].sort((a, b) => a - b);
      kicker.textContent = related.length > 1 ? "Shared term" : "Topic term";
      const title = element("h2", "", locked.id);
      title.id = "panel-title";
      const list = element("ul", "topic-list");
      related.forEach(id => {
        const topic = topics.get(id);
        list.append(element("li", "", `${topic.label} · ${topic.count} dissertations primarily assigned`));
      });
      panel.append(title, element("p", "", `This word connects to ${related.length} ${related.length === 1 ? "theme" : "themes"} in the model.`), heading("Connected themes"), list,
        element("p", "method-note", "A connection shows this term's LDA weight within a theme; it does not count dissertations containing the word."));
      return;
    }

    const topic = topics.get(locked.id);
    const topicLinks = links.filter(link => link.topic === topic.id).sort((a, b) => b.weight - a.weight);
    kicker.textContent = "Selected theme";
    const title = element("h2", "", topic.label);
    title.id = "panel-title";
    const count = element("p", "count", `${topic.count} dissertations primarily assigned to this theme`);
    const terms = element("ul", "term-list");
    topicLinks.forEach(link => terms.append(element("li", "", link.target.id)));
    const examples = element("ol", "example-list");
    topic.examples.forEach(example => {
      const item = element("li", "", `${example.title} `);
      const year = element("time", "", `(${example.year})`);
      year.dateTime = String(example.year);
      item.append(year);
      examples.append(item);
    });
    panel.append(title, count, element("p", "", topic.interpretation), heading("Top terms shown"), terms,
      heading("Representative dissertations"), examples,
      element("p", "method-note", "Titles are examples strongly associated with this topic in the original analysis. Topic labels are interpretations of model output."));
  }

  function positionFor(topicId) {
    if (narrow) return { x: width / 2 + (topicId % 2 ? 14 : -14), y: 136 + topicId * (height - 270) / 4 };
    const anchors = [
      [0.28, 0.20], [0.70, 0.21], [0.76, 0.55], [0.53, 0.79], [0.23, 0.62]
    ];
    return { x: width * anchors[topicId][0], y: height * anchors[topicId][1] };
  }

  function updateSize() {
    const nextWidth = Math.floor(svg.node().getBoundingClientRect().width);
    if (!nextWidth) return;
    const wasNarrow = narrow;
    const oldWidth = width;
    const oldHeight = height;
    width = nextWidth;
    narrow = width < 570;
    height = narrow ? 1280 : width < 760 ? 1010 : 900;
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("height", height);

    wordNodes.select(".word-shape").attr("r", node => wordRadius(node));
    wordNodes.select(".shared-rim").attr("r", node => wordRadius(node) + 4);
    nodeElements.filter(node => node.type === "topic").select(".topic-shape")
      .attr("x", node => -topicWidth(node) / 2).attr("width", node => topicWidth(node));

    if (!oldWidth || wasNarrow !== narrow) {
      nodes.forEach((node, index) => {
        const anchor = positionFor(node.group);
        const angle = index * 2.399963;
        node.x = anchor.x + (node.type === "topic" ? 0 : Math.cos(angle) * (narrow ? 64 : 92));
        node.y = anchor.y + (node.type === "topic" ? 0 : Math.sin(angle) * (narrow ? 75 : 105));
      });
    } else {
      nodes.forEach(node => {
        node.x *= width / oldWidth;
        node.y *= height / oldHeight;
      });
    }

    simulation
      .force("link").distance(narrow ? 80 : 118);
    simulation
      .force("collide").radius(node => node.type === "topic" ? topicWidth(node) / 2 + 9 : wordHalfWidth(node) + 9);
    simulation.force("x", d3.forceX(node => node.type === "topic" ? positionFor(node.group).x : width / 2)
      .strength(node => node.type === "topic" ? (narrow ? 0.3 : 0.17) : 0.008));
    simulation.force("y", d3.forceY(node => node.type === "topic" ? positionFor(node.group).y : height / 2)
      .strength(node => node.type === "topic" ? (narrow ? 0.3 : 0.17) : 0.008));
    simulation.force("center", d3.forceCenter(width / 2, height / 2));
    simulation.alpha(0.8).restart();
  }

  function ticked() {
    if (!width) return;
    nodes.forEach(node => {
      const halfWidth = node.type === "topic" ? topicWidth(node) / 2 : wordHalfWidth(node);
      const halfHeight = node.type === "topic" ? 30 : wordRadius(node);
      node.x = Math.max(halfWidth + 5, Math.min(width - halfWidth - 5, node.x));
      node.y = Math.max(halfHeight + 5, Math.min(height - halfHeight - 5, node.y));
    });
    linkElements
      .attr("x1", link => link.source.x).attr("y1", link => link.source.y)
      .attr("x2", link => link.target.x).attr("y2", link => link.target.y);
    nodeElements.attr("transform", node => `translate(${node.x},${node.y})`);
  }

  renderPanel();
  updateSize();
  new ResizeObserver(updateSize).observe(networkArea);
})();
