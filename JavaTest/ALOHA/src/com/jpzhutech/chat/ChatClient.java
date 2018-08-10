package com.jpzhutech.chat;
/**
 * 整个聊天程序首先：客户端发送消息，然后服务器端接收，接收到之后，再将其发送给其他的客户端
 */
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.BufferedWriter;
//import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.net.UnknownHostException;

import javax.swing.JFrame;

public class ChatClient
       {
	
	//引入文本成员变量，实现布局
	TextField tfText = new TextField();    //窗体程序中的文本域
	TextArea tfContent = new TextArea();   //窗体程序中的文本框
	Socket socket = null;                  //将socket暴露出来供其他的方法使用
	//DataOutputStream dataOutputStream = null;
	BufferedWriter bufferedWriter = null;
	public static void main(String[] args) {
		JFrame jFrame = new JFrame("在线聊天室");
		new ChatClient().launchFrame(jFrame,500,500);
		
	}
	
	public void launchFrame(JFrame jFrame,int width,int height) {
		//使用java.awt包中的ToolKit工具类，可以帮助我们获取分辨率等信息
		Toolkit defaultToolkit = Toolkit.getDefaultToolkit();  //获取与系统相关的工具类对象
		Dimension screenSize = defaultToolkit.getScreenSize();   //使用工具获得屏幕的维度信息
		int x = (int)screenSize.getWidth();  //使用工具获得屏幕的宽
		int y = (int)screenSize.getHeight();  //使用工具获得屏幕的高
		
		jFrame.setBounds((x-width)/2, (y-height)/2, width, height);   //设置窗体的位置
		
		jFrame.add(tfText,BorderLayout.SOUTH);  //增加组件到窗口中，使用默认的布局BoderLayout
		jFrame.add(tfContent,BorderLayout.NORTH); //增加组件到窗口中
		
		jFrame.pack();   //刚好包住
		
		//利用事件实现退出的功能
		jFrame.addWindowListener(new WindowAdapter() {

			@Override
			public void windowClosing(WindowEvent e) {
				disconnect();  //当窗口关闭时，将所有的资源关闭
				System.exit(0);
			}
			
		});
		jFrame.setVisible(true);  //设置窗体的可见性
		
		connect();  //启动之后直接连接上服务器
		//jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);  //设置点击关闭按钮时窗口会被关闭的事件
		
		//设置事件监听当在TextField中输入回车时，将内容显示在TextArea中，并且将其发送到服务器端
		tfText.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				String str = tfText.getText().trim();  //将前后的空格全部去掉
				tfContent.setText(str);
				tfText.setText(""); //敲完之后将TextField中的内容设置为空
				try {
					bufferedWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream())); //得到输出流对象
					bufferedWriter.write(str+"\r\n");  //一定不能少\r\n，否则readLine方法不会读到结束
					bufferedWriter.flush();
					//dataOutputStream.writeUTF(str);  //在建立连接时就已经初始化了dataOutputStream
					//dataOutputStream.flush();
					//dataOutputStream.close();  如果有只能输出一次
				} catch (IOException e1) {
					throw new RuntimeException(e1);
				}
			}
		});
	}
	
	/**
	 * 功能：连接服务器功能：固定连接本机localhost，监听端口为8888
	 */
	public void connect(){
		try {
			socket = new Socket("127.0.0.1",8888);
			//dataOutputStream = new DataOutputStream(socket.getOutputStream());
			bufferedWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
			System.out.println("Connected!");
		} catch (UnknownHostException e) {
			throw new RuntimeException(e);
		} catch (IOException e) { 
			throw new RuntimeException(e);
		}
	}
	
	public void disconnect(){
		try{
			//dataOutputStream.close();
			bufferedWriter.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		try {
			socket.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
