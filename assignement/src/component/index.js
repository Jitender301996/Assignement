import React, { useState, useEffect } from "react";
import Table from "./Table";

const onlineIcon =  <svg
width="10"
height="11"
viewBox="0 0 10 11"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<circle cx="5" cy="5.5" r="5" fill="#029262" />
</svg>

const offlineIcon =<svg
width="10"
height="11"
viewBox="0 0 10 11"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<circle cx="5" cy="5.5" r="5" fill="#DC3545" />
</svg>

const waringIcon =  <svg
width="16"
height="17"
viewBox="0 0 16 17"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M7.99992 15.1667C4.31802 15.1667 1.33325 12.1819 1.33325 8.50001C1.33325 4.81811 4.31802 1.83334 7.99992 1.83334C11.6818 1.83334 14.6666 4.81811 14.6666 8.50001C14.6666 12.1819 11.6818 15.1667 7.99992 15.1667ZM7.99992 13.8333C10.9455 13.8333 13.3333 11.4455 13.3333 8.50001C13.3333 5.55449 10.9455 3.16668 7.99992 3.16668C5.0544 3.16668 2.66659 5.55449 2.66659 8.50001C2.66659 11.4455 5.0544 13.8333 7.99992 13.8333ZM7.33325 10.5H8.66658V11.8333H7.33325V10.5ZM7.33325 5.16668H8.66658V9.16668H7.33325V5.16668Z"
  fill="#FF7E17"
/>
</svg>

const cloudIcon =  <svg
width="16"
height="13"
viewBox="0 0 16 13"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M8.25008 0.333344C10.8274 0.333344 12.9167 2.42268 12.9167 5.00001C12.9167 5.07568 12.9149 5.15094 12.9114 5.22572C14.4677 5.77334 15.5834 7.25641 15.5834 9.00001C15.5834 11.2091 13.7925 13 11.5834 13H4.91675C2.70761 13 0.916748 11.2091 0.916748 9.00001C0.916748 7.25641 2.03239 5.77334 3.58877 5.22572C3.58521 5.15094 3.58341 5.07568 3.58341 5.00001C3.58341 2.42268 5.67275 0.333344 8.25008 0.333344ZM8.25008 1.66668C6.40913 1.66668 4.91675 3.15906 4.91675 5.00001C4.91675 5.05432 4.91804 5.10843 4.9206 5.1623L4.96783 6.15394L4.0313 6.48348C2.97301 6.85581 2.25008 7.85928 2.25008 9.00001C2.25008 10.4727 3.44399 11.6667 4.91675 11.6667H11.5834C13.0561 11.6667 14.2501 10.4727 14.2501 9.00001C14.2501 7.52668 13.0567 6.33334 11.5834 6.33334C10.4054 6.33334 9.40588 7.09714 9.05288 8.15648L7.78768 7.73474C8.31708 6.14568 9.81675 5.00001 11.5834 5.00001C11.5834 3.15906 10.091 1.66668 8.25008 1.66668Z"
  fill="#A0A0A0"
/>
</svg>

const deviceIcon = <svg
width="13"
height="12"
viewBox="0 0 13 12"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M1.58333 5.33333H10.9167V1.33333H1.58333V5.33333ZM12.25 0.666667V11.3333C12.25 11.7015 11.9515 12 11.5833 12H0.916667C0.54848 12 0.25 11.7015 0.25 11.3333V0.666667C0.25 0.29848 0.54848 0 0.916667 0H11.5833C11.9515 0 12.25 0.29848 12.25 0.666667ZM10.9167 6.66667H1.58333V10.6667H10.9167V6.66667ZM2.91667 8H4.91667V9.33333H2.91667V8ZM2.91667 2.66667H4.91667V4H2.91667V2.66667Z"
  fill="#A0A0A0"
/>
</svg>

const LiveData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const token = "4ApVMIn5sTxeW7GQ5VWeWiy";
    const url = "https://api-app-staging.wobot.ai/app/v1/fetch/cameras";

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (payload) => {
    const token = "4ApVMIn5sTxeW7GQ5VWeWiy";
    const url = `https://api-app-staging.wobot.ai/app/v1/update/status`;

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Status updated successfully:", result);
      return result;
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (val) => {
    const updatedData = data?.filter((item) => item.id !== val.id);
    setData(updatedData);
  };

  const handleToggleStatus = (val) => {
    console.log(val)
    const {id,status} = val
    const payload = { id:id, status: status };
    if (val.status === "Inactive") {
        console.log('first')
      payload.status = "Active";
    } else {
        console.log('firs2')
      payload.status = "Inactive";
    }

    updateStatus(payload);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (item) => (
        <div>
          {item.current_status === "Online" ? (
           onlineIcon
          ) : (
            offlineIcon
          )}
          {item.name}
          {item.hasWarning ? (
           waringIcon
          ) : null}
        </div>
      ),
    },
    {
      key: "health",
      label: "Health",
      render: (item) => (
        <>
          <span style={{ margin: "0px 5px" }}>
          {cloudIcon}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border: `2px solid ${item.health.cloud ? "#FF7E17" : "#fff"}`,
                margin: "0px 5px",
              }}
            >
              {item.health.cloud || "-"}
            </span>
          </span>
          <span style={{ margin: "0px 5px" }}>
           {deviceIcon}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border: `2px solid ${item.health.device ? "#029262" : "#fff"}`,
                margin: "0px 5px",
              }}
            >
              {item.health.device || "-"}
            </span>
          </span>
        </>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (item) => <span>{item.location ? item.location : "N/A"}</span>,
    },
    {
      key: "recorder",
      label: "Recorder",
      render: (item) => <span>{item.recorder ? item.recorder : "N/A"}</span>,
    },
    {
      key: "tasks",
      label: "Tasks",
      render: (item) => <>{item.tasks ? `${item.tasks} Tasks` : "N/A"}</>,
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          onClick={() => handleToggleStatus(item)}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            backgroundColor:
              item.status === "Inactive" ? "#0292621A" : "#F0F0F0",
            color: item.status === "Inactive" ? "#029262" : "#A0A0A0",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          {item.status === "Inactive" ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      key: "action",
      label: "Action",
      render: (item) => (
        <button onClick={() => handleDelete(item)}>Delete</button>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table data={data} columns={columns} tableTitle="Cameras" />
      )}
    </div>
  );
};

export default LiveData;
