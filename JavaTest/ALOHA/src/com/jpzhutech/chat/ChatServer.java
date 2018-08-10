package com.jpzhutech.chat;
/***
 * 采用异步实现多个客户端连接服务器，在Java 1.4中实现的技术，传统的解决方案是使用单独的线程，本程序使用的单独的线程知识，但是并不推荐使用，本程序知识为了练习线程的使用
 * @author 朱君鹏

 */

//import java.io.DataInputStream;
import java.awt.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;


public class ChatServer extends Thread{
	Socket socket = null;
	
	ArrayList<ChatServer> list = new ArrayList<ChatServer>(); //用来保存所有已经建立连接的
	
	
	public ChatServer(Socket socket) {
		this.socket = socket;
	}
	
	
	@Override
	public void run() {
		boolean started = false ;  //接收客户端连接的成功与否的标志
		try {
			 try{
				 started = true;
				 while(started){
					 boolean bConnected = false;  //查看服务器是否成功的接收连接 
					 bConnected = true;
					 System.out.println("a client connected!");  //调试时用的
					 //DataInputStream dataInputStream = new DataInputStream(socket.getInputStream());
					 BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
					 while(bConnected){
						 String str = bufferedReader.readLine();  //readLine阻塞性方法，永远不能连接多个客户端
						 //String str = dataInputStream.readUTF();
						 System.out.println(str);
					 }
					 //dataInputStream.close();
					 bufferedReader.close();
				 }
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}catch(Exception e){
			throw new RuntimeException(e);
		}
			
	}
	
	public static void main(String[] args) {
		try {
			ServerSocket serverSocket = new ServerSocket(8888);
			while(true){
				Socket socket = serverSocket.accept();
				new ChatServer(socket).start();  //开启多线程
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
	}
	
	/*一种简单的实现方法，但是不能实现多个客户端的连接
	public static void main(String[] args) {
		boolean started = false ;  //接收客户端连接的成功与否的标志
		ServerSocket serverSocket = null;
		 Socket socket = null;
		try {
			 serverSocket = new ServerSocket(8888);
			 
			 try{
				 started = true;
				 while(started){
					 boolean bConnected = false;  //查看服务器是否成功的接收连接 
					 socket = serverSocket.accept();
					 bConnected = true;
					 System.out.println("a client connected!");  //调试时用的
					 //DataInputStream dataInputStream = new DataInputStream(socket.getInputStream());
					 BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
					 while(bConnected){
						 String str = bufferedReader.readLine();  //readLine阻塞性方法，永远不能连接多个客户端
						 //String str = dataInputStream.readUTF();
						 System.out.println(str);
					 }
					 //dataInputStream.close();
					 bufferedReader.close();
				 }
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}catch(Exception e){
			throw new RuntimeException(e);
		}finally{
			try {
				serverSocket.close();
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}
	*/
	
	
}
             