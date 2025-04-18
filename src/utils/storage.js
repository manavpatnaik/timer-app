export const saveTimers = (timers) => {
  try {
    localStorage.setItem("timers", JSON.stringify(timers));
  } catch (error) {
    console.error(`Error saving timers: ${error}`);
  }
};

export const loadTimers = () => {
  try {
    const timers = localStorage.getItem("timers");
    return timers ? JSON.parse(timers) : [];
  } catch (error) {
    console.error(`Error loading timers: ${error}`);
    return [];
  }
};

export const saveHistory = (history) => {
  try {
    localStorage.setItem("history", JSON.stringify(history));
  } catch (error) {
    console.error(`Error saving history: ${error}`);
  }
};

export const loadHistory = () => {
  try {
    const history = localStorage.getItem("history");
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error(`Error loading history: ${error}`);
    return [];
  }
};

export const exportData = () => {
  try {
    const timers = loadTimers();
    const history = loadHistory();

    const data = {
      timers,
      history,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `timer-data-${new Date()
      .toLocaleDateString()
      .replace(/\//g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error(`Error exporting data: ${error}`);
    return false;
  }
};
