export const getReports = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const content = await response.json();
    if (!response.ok) {
      return { ok: false, content };
    } else {
      return { ok: true, content };
    }
  } catch (error) {
    console.log(error);
  }

}

export const getReportByID = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const content = await response.json();
    if (!response.ok) {
      return { ok: false, content };
    } else {
      return { ok: true, content };
    }
  } catch (error) {
    console.log(error);
  }

}

export const getUserReports = async (url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const content = await response.json();
    if (!response.ok) {
      return { ok: false, content };
    } else {
      return { ok: true, content };
    }
  } catch (error) {
    console.log(error);
  }

}


export const createReport = async (url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const content = await response.json();
    if (!response.ok) {
      return { ok: false, content };
    } else {
      return { ok: true, content };
    }
  } catch (error) {
    console.log(error);
  }

}
