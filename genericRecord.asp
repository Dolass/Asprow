﻿		<!--#include file="inc/record_head.inc"-->
<%
	Dim g_tablename	'Table Name
	Dim g_IDColumn	'ID column
	Dim g_colsWOID	'Columns without ID field
	Dim g_listTitle	'Title of the Page
	
	g_listTitle = request("gnrTitle")
	g_tablename = trim(request("gnrTABLENAME"))
	if g_tablename="" then
		response.write "You must send gnrTABLENAME parameter in order to display the page.."
		response.end
	end if
	g_tablename = replace(g_tablename,"'","''")
	
	on error resume next
	Rs.open "SELECT TOP 1 * FROM "&g_tablename,conn
	if err<>0 then
		response.write "Error occured : "&err.description
		response.end
	else
		sayac = 0
		for each x in Rs.fields
			if sayac = 0 then
				g_IDColumn = x.name
			else
				g_colsWOID = g_colsWOID&x.name&", "
			end if
			sayac = sayac + 1
		next
		 g_colsWOID = Left(g_colsWOID,Len(g_colsWOID)-2)
	end if
	Set Rs = Server.CreateObject("Adodb.Recordset")
	
	if g_listTitle="" then
		g_listTitle = "Generic Record Page for "&g_tablename
	end if


	
		sub user(myFunction)
		End sub
		CASES = "|"
		GENERICPAGE= 1
		REQUIRED_COLUMNS= ""
		RECORD_TITLE = g_listTitle
		TABLENAME = g_tablename
		COLUMNS = g_colsWOID
		LIST_PAGE = "genericList.asp?gnrTABLENAME="&g_tablename
		LINKED_COLUMN = g_IDColumn
		%>
		
		
		<!--#include file="inc/record_body.inc"-->