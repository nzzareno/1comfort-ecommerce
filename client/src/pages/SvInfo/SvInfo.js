import React, { useState, useEffect } from "react";
import "./SvInfo.scss";
import axios from "axios";

const SvInfo = () => {
  const [processNode, setProcessNode] = useState({});

  useEffect(() => {
    axios
      .get("/api/process/info")
      .then((res) => {
        setProcessNode(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="info-section">
      <table className="table-fill">
        <thead>
          <tr>
            <th className="text-left">PROCESS</th>
            <th className="text-left">VALUE</th>
          </tr>
        </thead>
        <tbody className="table-hover">
          <tr>
            <td className="text-left"> PID </td>
            <td className="text-left">{processNode.pid}</td>
          </tr>
          <tr>
            <td className="text-left"> UPTIME </td>
            <td className="text-left">{processNode.uptime}</td>
          </tr>
          <tr>
            <td className="text-left">ARGV</td>
            <td className="text-left">{processNode.argv}</td>
          </tr>
          <tr>
            <td className="text-left">VERSION</td>
            <td className="text-left">{processNode.version}</td>
          </tr>
          <tr>
            <td className="text-left">PPID</td>
            <td className="text-left">{processNode.ppid}</td>
          </tr>

          <tr>
            <td className="text-left">ARCH</td>
            <td className="text-left">{processNode.arch}</td>
          </tr>
          <tr>
            <td className="text-left">PLATFORM</td>
            <td className="text-left">{processNode.platform}</td>
          </tr>

          <tr>
            <td className="text-left">EXEC PATH</td>
            <td className="text-left">{processNode.execPath}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default SvInfo;
