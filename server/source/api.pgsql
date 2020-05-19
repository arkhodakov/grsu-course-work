
SELECT priority, count(priority) as count FROM issues GROUP BY priority;

SELECT status, count(status) as count FROM issues GROUP BY status;

SELECT accounts.name, count(issues.id) FROM issues
LEFT JOIN accounts ON accounts.id = issues.assignee
GROUP BY accounts.name;

SELECT accounts.name, count(issues.id), issues.status FROM issues
LEFT JOIN accounts ON accounts.id = issues.assignee
GROUP BY accounts.name, issues.status;

SELECT accounts.name, count(issues.id), issues.priority FROM issues
LEFT JOIN accounts ON accounts.id = issues.assignee
GROUP BY accounts.name, issues.priority
ORDER BY accounts.name;


SELECT projects.name, count(issues.id) FROM issues_list list
LEFT JOIN projects ON projects.id = list.project_id
LEFT JOIN issues ON issues.id = list.issue_id
GROUP BY projects.name;

SELECT projects.name, count(issues.id), issues.priority FROM issues_list list
LEFT JOIN projects ON projects.id = list.project_id
LEFT JOIN issues ON issues.id = list.issue_id
GROUP BY projects.name, issues.priority;